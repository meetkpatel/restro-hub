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
	"userId" integer,
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



CREATE TABLE "public"."cartItems" (
	"cartItemId" serial NOT NULL,
	"cartId" integer NOT NULL,
	"itemId" integer NOT NULL,
	"quantity" integer NOT NULL,
	CONSTRAINT "cartItems_pk" PRIMARY KEY ("cartItemId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."items" (
	"itemId" serial NOT NULL,
	"itemName" TEXT NOT NULL,
	"itemDescription" TEXT NOT NULL,
	"itemPrice" TEXT NOT NULL,
	"categoryId" integer NOT NULL,
  "itemImg" TEXT NOT NULL,
	CONSTRAINT "items_pk" PRIMARY KEY ("itemId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."orders" (
	"orderId" serial NOT NULL,
	"cartId" integer NOT NULL,
	"orderNote" TEXT NOT NULL,
	"orderStatus" TEXT NOT NULL,
	CONSTRAINT "orders_pk" PRIMARY KEY ("orderId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."waitlist" (
	"userId" integer NOT NULL,
	"userName" TEXT NOT NULL,
	"userNumber" TEXT NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."cart" (
	"cartId" serial NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "cart_pk" PRIMARY KEY ("cartId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "tables" ADD CONSTRAINT "tables_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");


ALTER TABLE "cartItems" ADD CONSTRAINT "cartItems_fk0" FOREIGN KEY ("itemid") REFERENCES "items"("itemId");

ALTER TABLE "items" ADD CONSTRAINT "items_fk0" FOREIGN KEY ("categoryId") REFERENCES "category"("categoryId");


ALTER TABLE "waitlist" ADD CONSTRAINT "waitlist_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "cart" ADD CONSTRAINT "cart_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
