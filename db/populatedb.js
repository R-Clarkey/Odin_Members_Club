// create table "users" (
//   "id" serial primary key,
//   "first_name" varchar(255) null,
//   "last_name" varchar(255) null,
//   "email" varchar(255) not null,
//   "member_status" BOOLEAN null default false
// );

// create table "users" (
//   "message_id" serial primary key,
//   "title" varchar(255) null,
//   "message" varchar(255) not null,
//   "created_at" timestamp not null default NOW(),
//   "owner_id" INT null
// );