module.exports = class Data1706593448466 {
    name = 'Data1706593448466'

    async up(db) {
        await db.query(`CREATE TABLE "deposit" ("id" character varying NOT NULL, "from" text NOT NULL, "value" numeric NOT NULL, "commitment" text NOT NULL, "leaf_index" numeric NOT NULL, "timestamp" numeric NOT NULL, "block_number" numeric NOT NULL, "block_timestamp" numeric NOT NULL, "transaction_hash" text NOT NULL, CONSTRAINT "PK_6654b4be449dadfd9d03a324b61" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "withdrawal" ("id" character varying NOT NULL, "to" text NOT NULL, "nullifier_hash" text NOT NULL, "relayer" text NOT NULL, "fee" numeric NOT NULL, "block_number" numeric NOT NULL, "block_timestamp" numeric NOT NULL, "transaction_hash" text NOT NULL, CONSTRAINT "PK_840e247aaad3fbd4e18129122a2" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "deposit"`)
        await db.query(`DROP TABLE "withdrawal"`)
    }
}
