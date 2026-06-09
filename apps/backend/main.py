import os
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
import logging
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# FastAPI app
app = FastAPI(
    title="AXIS CORE™ API",
    description="API Terapêutica Multidimensional",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase client
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(supabase_url, supabase_key)

# ================================================
# SCHEMAS
# ================================================

class ProfileCreate(BaseModel):
    email: EmailStr
    full_name: str
    role: str = "client"

class SessionCreate(BaseModel):
    client_id: str
    therapist_id: str
    session_type: str
    scheduled_at: datetime

class SessionResponse(BaseModel):
    id: str
    client_id: str
    therapist_id: str
    session_type: str
    status: str
    scheduled_at: datetime
    created_at: datetime

class BiometryData(BaseModel):
    session_id: str
    bpm: int
    hrv_rmssd: float
    coherence: float
    stress_index: float
    signal_quality: str

# ================================================
# ROUTES - HEALTH
# ================================================

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "ok",
        "timestamp": datetime.now().isoformat(),
        "service": "AXIS CORE™ API v1.0.0"
    }

# ================================================
# ROUTES - AUTH
# ================================================

@app.post("/auth/signup")
async def signup(profile: ProfileCreate):
    """Create new user profile"""
    try:
        response = supabase.table("profiles").insert({
            "email": profile.email,
            "full_name": profile.full_name,
            "role": profile.role
        }).execute()
        
        return {
            "success": True,
            "message": "Perfil criado com sucesso",
            "data": response.data[0] if response.data else None
        }
    except Exception as e:
        logger.error(f"Signup error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/auth/profile/{user_id}")
async def get_profile(user_id: str):
    """Get user profile"""
    try:
        response = supabase.table("profiles").select("*").eq("id", user_id).execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail="Perfil não encontrado")
        
        return response.data[0]
    except Exception as e:
        logger.error(f"Get profile error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

# ================================================
# ROUTES - SESSIONS
# ================================================

@app.get("/sessions")
async def list_sessions(therapist_id: Optional[str] = None, client_id: Optional[str] = None):
    """List sessions with optional filtering"""
    try:
        query = supabase.table("sessions").select("*")
        
        if therapist_id:
            query = query.eq("therapist_id", therapist_id)
        if client_id:
            query = query.eq("client_id", client_id)
        
        response = query.execute()
        return response.data
    except Exception as e:
        logger.error(f"List sessions error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/sessions")
async def create_session(session: SessionCreate):
    """Create new session"""
    try:
        response = supabase.table("sessions").insert({
            "client_id": session.client_id,
            "therapist_id": session.therapist_id,
            "session_type": session.session_type,
            "scheduled_at": session.scheduled_at.isoformat(),
            "status": "scheduled"
        }).execute()
        
        return {
            "success": True,
            "message": "Sessão criada com sucesso",
            "data": response.data[0] if response.data else None
        }
    except Exception as e:
        logger.error(f"Create session error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/sessions/{session_id}")
async def get_session(session_id: str):
    """Get specific session"""
    try:
        response = supabase.table("sessions").select("*").eq("id", session_id).execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail="Sessão não encontrada")
        
        return response.data[0]
    except Exception as e:
        logger.error(f"Get session error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@app.put("/sessions/{session_id}")
async def update_session(session_id: str, status: str):
    """Update session status"""
    try:
        response = supabase.table("sessions").update({
            "status": status,
            "updated_at": datetime.now().isoformat()
        }).eq("id", session_id).execute()
        
        return {
            "success": True,
            "message": "Sessão atualizada",
            "data": response.data[0] if response.data else None
        }
    except Exception as e:
        logger.error(f"Update session error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

# ================================================
# ROUTES - BIOMETRY
# ================================================

@app.post("/biometry")
async def save_biometry(data: BiometryData):
    """Save biometry data"""
    try:
        response = supabase.table("biometry_logs").insert({
            "session_id": data.session_id,
            "bpm": data.bpm,
            "hrv_rmssd": data.hrv_rmssd,
            "coherence": data.coherence,
            "stress_index": data.stress_index,
            "signal_quality": data.signal_quality,
            "timestamp": datetime.now().isoformat()
        }).execute()
        
        return {
            "success": True,
            "message": "Dados biométricos salvos",
            "data": response.data[0] if response.data else None
        }
    except Exception as e:
        logger.error(f"Save biometry error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/biometry/{session_id}")
async def get_biometry(session_id: str):
    """Get biometry data for session"""
    try:
        response = supabase.table("biometry_logs").select("*").eq("session_id", session_id).execute()
        return response.data
    except Exception as e:
        logger.error(f"Get biometry error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

# ================================================
# ROUTES - ENGINE (AXIS TABLES)
# ================================================

@app.get("/engine/tables")
async def get_engine_tables():
    """Get all AXIS Engine tables"""
    try:
        response = supabase.table("axis_tables").select("*").execute()
        return response.data
    except Exception as e:
        logger.error(f"Get engine tables error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/engine/tables/{slug}")
async def get_engine_table(slug: str):
    """Get specific engine table"""
    try:
        response = supabase.table("axis_tables").select("*").eq("slug", slug).execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail="Mesa não encontrada")
        
        return response.data[0]
    except Exception as e:
        logger.error(f"Get engine table error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

# ================================================
# ROUTES - NOTIFICATIONS
# ================================================

@app.get("/notifications/{user_id}")
async def get_notifications(user_id: str):
    """Get user notifications"""
    try:
        response = supabase.table("notifications").select("*").eq("user_id", user_id).execute()
        return response.data
    except Exception as e:
        logger.error(f"Get notifications error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

# ================================================
# ROUTES - ERROR HANDLING
# ================================================

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )

# ================================================
# Main
# ================================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
