"""Beanie database models"""

from datetime import datetime
from beanie import Document, PydanticObjectId
from pydantic import Field, EmailStr
from bson.objectid import ObjectId
from enum import Enum
from pydantic import BaseModel
from datetime import date


class TodoState(Enum):
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    DONE = "done"


class LevelOfImportance(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class User(Document):
    name: str
    email: EmailStr


class TodoList(Document):
    name: str
    description: str | None = None
    createdDate: datetime
    updatedDate: datetime | None = None


class CreateUpdateTodoList(BaseModel):
    name: str
    description: str | None = None


class TodoItem(Document):
    list_id: PydanticObjectId
    name: str
    description: str | None = Field(max_length=400)
    state: TodoState
    level_of_importance: LevelOfImportance
    date_created: datetime
    date_updated: datetime | None = None


class CreateUpdateTodoItem(BaseModel):
    name: str
    description: str | None = None
    state: TodoState
    level_of_importance: LevelOfImportance


__beanie_models__ = [TodoList, TodoItem]
