from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Literal

app = FastAPI(title="Task Manager API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200",
        "https://*.netlify.app",
        "https://*.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

users = [
    {
        "username": "test",
        "password": "test123"
    }
]

tasks = [
    {
        "id": 1,
        "title": "Design Task Board UI",
        "description": "Create responsive Angular layout",
        "stage": "Todo"
    },
    {
        "id": 2,
        "title": "Connect Angular with FastAPI",
        "description": "Integrate frontend and backend APIs",
        "stage": "In Progress"
    },
    {
        "id": 3,
        "title": "Deploy Project",
        "description": "Deploy frontend and backend with README links",
        "stage": "Done"
    }
]

next_task_id = 4

StageType = Literal["Todo", "In Progress", "Done"]


class User(BaseModel):
    username: str = Field(..., min_length=3)
    password: str = Field(..., min_length=4)


class Task(BaseModel):
    title: str = Field(..., min_length=2)
    description: str = Field(..., min_length=2)
    stage: StageType


@app.get("/")
def home():
    return {
        "message": "Task Manager Backend is running",
        "status": "success"
    }


@app.post("/register")
def register(user: User):
    for existing_user in users:
        if existing_user["username"] == user.username:
            raise HTTPException(status_code=400, detail="User already exists")

    users.append(user.model_dump())

    return {
        "message": "User registered successfully",
        "status": "success"
    }


@app.post("/login")
def login(user: User):
    for existing_user in users:
        if (
            existing_user["username"] == user.username
            and existing_user["password"] == user.password
        ):
            return {
                "message": "Login successful",
                "username": user.username,
                "status": "success"
            }

    raise HTTPException(status_code=401, detail="Invalid username or password")


@app.get("/tasks")
def get_tasks():
    return tasks


@app.post("/tasks")
def create_task(task: Task):
    global next_task_id

    new_task = {
        "id": next_task_id,
        "title": task.title.strip(),
        "description": task.description.strip(),
        "stage": task.stage
    }

    tasks.append(new_task)
    next_task_id += 1

    return {
        "message": "Task created successfully",
        "task": new_task,
        "status": "success"
    }


@app.put("/tasks/{task_id}")
def update_task(task_id: int, task: Task):
    for existing_task in tasks:
        if existing_task["id"] == task_id:
            existing_task["title"] = task.title.strip()
            existing_task["description"] = task.description.strip()
            existing_task["stage"] = task.stage

            return {
                "message": "Task updated successfully",
                "task": existing_task,
                "status": "success"
            }

    raise HTTPException(status_code=404, detail="Task not found")


@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    for existing_task in tasks:
        if existing_task["id"] == task_id:
            tasks.remove(existing_task)

            return {
                "message": "Task deleted successfully",
                "status": "success"
            }

    raise HTTPException(status_code=404, detail="Task not found")