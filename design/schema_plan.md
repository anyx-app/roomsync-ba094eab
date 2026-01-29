# Schema Plan - RoomSync

## Overview
RoomSync requires a relational schema to manage hotel operations, specifically housekeeping tasks, room statuses, and staff assignments. The core entities are Users (Staff/Managers), Rooms, Shifts, and Tasks.

## Tables

### 1. profiles
Extends the default Supabase `auth.users` table.
- **id** (uuid, PK): References `auth.users.id`.
- **email** (text): Copied from auth for easy query.
- **role** (text): Enum ['admin', 'manager', 'staff']. Default 'staff'.
- **full_name** (text): Display name.
- **avatar_url** (text): Optional profile picture.
- **status** (text): Enum ['active', 'off_duty', 'on_break']. Real-time availability.
- **created_at** (timestamptz): Default now().

### 2. floors
Represents physical floors in the hotel to organize the visual map.
- **id** (uuid, PK): Default gen_random_uuid().
- **level_number** (int): Logical floor number (e.g., 1, 2, 10).
- **layout_image_url** (text): Optional background for the visual map.
- **created_at** (timestamptz).

### 3. rooms
The core entity representing hotel rooms.
- **id** (uuid, PK): Default gen_random_uuid().
- **room_number** (text): Unique identifier (e.g., "101", "Penthouse").
- **floor_id** (uuid, FK): References `floors.id`.
- **room_type** (text): e.g., 'Single', 'Double', 'Suite'.
- **current_status** (text): Enum ['clean', 'dirty', 'cleaning', 'inspected', 'do_not_disturb', 'maintenance'].
- **priority_level** (text): Enum ['standard', 'vip', 'rush'].
- **position_x** (float): X coordinate (0-100%) for visual map placement.
- **position_y** (float): Y coordinate (0-100%) for visual map placement.
- **last_cleaned_at** (timestamptz).
- **updated_at** (timestamptz).

### 4. shifts
Tracks working periods for staff members.
- **id** (uuid, PK).
- **user_id** (uuid, FK): References `profiles.id`.
- **start_time** (timestamptz): Scheduled or actual start.
- **end_time** (timestamptz): Nullable until shift ends.
- **status** (text): Enum ['scheduled', 'active', 'completed'].

### 5. tasks
Represents a specific cleaning assignment for a room.
- **id** (uuid, PK).
- **room_id** (uuid, FK): References `rooms.id`.
- **assigned_to** (uuid, FK): References `profiles.id`. Can be null (unassigned).
- **shift_id** (uuid, FK): References `shifts.id`. Optional linkage.
- **task_type** (text): Enum ['cleaning', 'inspection', 'turndown'].
- **status** (text): Enum ['pending', 'in_progress', 'completed', 'verified'].
- **priority** (text): Enum ['standard', 'vip', 'rush']. Snapshotted from room at creation time.
- **notes** (text): Special instructions.
- **started_at** (timestamptz).
- **completed_at** (timestamptz).
- **created_at** (timestamptz).

### 6. activity_logs
Audit trail for all major actions (status changes, assignments).
- **id** (uuid, PK).
- **user_id** (uuid, FK): Who performed the action.
- **entity_type** (text): e.g., 'room', 'task'.
- **entity_id** (uuid): ID of the affected entity.
- **action** (text): Description of change (e.g., "Marked Room 101 as Clean").
- **created_at** (timestamptz).

## Relationships
- One **Floor** has many **Rooms**.
- One **Profile** (Staff) has many **Shifts**.
- One **Shift** has many **Tasks**.
- One **Room** can have many historical **Tasks**, but usually one active Task.

## Security (RLS)
- **Managers**: specific permissions to create tasks, assign staff, view all.
- **Staff**: can view assigned tasks, update status of their own tasks/rooms.
- **Public**: No access.
