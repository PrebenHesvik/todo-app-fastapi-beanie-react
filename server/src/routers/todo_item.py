from fastapi import APIRouter, Depends, HTTPException, status
from datetime import date
import datetime as dt
from beanie import PydanticObjectId

from ..models import (
    CreateUpdateTodoItem,
    TodoItem,
)


router = APIRouter(prefix="", tags=["todo-item"])


@router.get("/lists/{list_id}/items", response_model=list[TodoItem])
async def get_todo_items(list_id: PydanticObjectId) -> list[TodoItem]:
    return await TodoItem.find_many(TodoItem.list_id == list_id).to_list()


@router.post(
    "/lists/{list_id}/items",
    status_code=status.HTTP_201_CREATED,
    response_model=TodoItem,
)
async def create_todo_item(
    list_id: PydanticObjectId, body: CreateUpdateTodoItem, response_model=TodoItem
) -> TodoItem:
    todo_item = TodoItem(
        list_id=list_id, **body.dict(), date_created=dt.datetime.now(dt.timezone.utc)
    )
    await todo_item.create()
    return todo_item


@router.get("/lists/{list_id}/items/{item_id}", response_model=TodoItem)
async def get_todo_item(
    list_id: PydanticObjectId, item_id: PydanticObjectId
) -> TodoItem:
    if item := await TodoItem.find_one(
        TodoItem.list_id == list_id, TodoItem.id == item_id
    ):
        return item
    else:
        raise HTTPException(status_code=404, detail="Todo item not found")


@router.put("/lists/{list_id}/items/{item_id}", response_model=TodoItem)
async def update_todo(
    list_id: PydanticObjectId, item_id: PydanticObjectId, body: CreateUpdateTodoItem
) -> TodoItem:
    todo_item = await TodoItem.find_one(
        TodoItem.list_id == list_id, TodoItem.id == item_id
    )

    if not todo_item:
        raise HTTPException(status_code=404, detail="Todo item not found")

    await todo_item.update({"$set": body.dict(exclude_unset=True)})
    todo_item.date_updated = dt.datetime.now(dt.timezone.utc)
    return await todo_item.save()


@router.delete(
    "/lists/{list_id}/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT
)
async def delete_todo(list_id: PydanticObjectId, item_id: PydanticObjectId) -> None:
    todo_item = await TodoItem.find_one(document_id=item_id)
    if not todo_item:
        raise HTTPException(status_code=404, detail="Todo list not found")
    await todo_item.delete()
