set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";
CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"userName" TEXT NOT NULL,
	"userNumber" TEXT NOT NULL UNIQUE,
	"userPassword" TEXT NOT NULL,
	"userRole" TEXT NOT NULL,
	"createdAt" timestamptz(6) NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."tables" (
	"tableId" serial NOT NULL,
	"tableNumber" integer NOT NULL,
	"customerId" integer NOT NULL,
	CONSTRAINT "tables_pk" PRIMARY KEY ("tableId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."category" (
	"categoryId" serial NOT NULL,
	"categoryName" TEXT NOT NULL,
	CONSTRAINT "category_pk" PRIMARY KEY ("categoryId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."ordersItems" (
	"orderId" interval NOT NULL,
	"itemid" integer NOT NULL,
	"quantity" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."items" (
	"itemId" serial NOT NULL,
	"itemName" TEXT NOT NULL,
	"itemDescription" TEXT NOT NULL,
	"itemPrice" TEXT NOT NULL,
	"categoryId" integer NOT NULL,
	CONSTRAINT "items_pk" PRIMARY KEY ("itemId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."orders" (
	"orderId" serial NOT NULL,
	"userId" integer NOT NULL,
	"orderNote" TEXT NOT NULL,
	"orderStatus" TEXT NOT NULL,
	CONSTRAINT "orders_pk" PRIMARY KEY ("orderId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "tables" ADD CONSTRAINT "tables_fk0" FOREIGN KEY ("customerId") REFERENCES "users"("userId");


ALTER TABLE "ordersItems" ADD CONSTRAINT "ordersItems_fk0" FOREIGN KEY ("orderId") REFERENCES "orders"("orderId");
ALTER TABLE "ordersItems" ADD CONSTRAINT "ordersItems_fk1" FOREIGN KEY ("itemid") REFERENCES "items"("itemId");

ALTER TABLE "items" ADD CONSTRAINT "items_fk0" FOREIGN KEY ("categoryId") REFERENCES "category"("categoryId");

ALTER TABLE "orders" ADD CONSTRAINT "orders_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
