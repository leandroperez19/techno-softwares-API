import { DataTypes } from "sequelize";
import { sequelize } from "../db";

const Sale = sequelize.define(
    "Sale",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "categories",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        currency: {
            type: DataTypes.ENUM("USD", "EUR", "GBP"),
            allowNull: false,
        },
        itemType: {
            type: DataTypes.ENUM(
                "Electronics",
                "Clothing",
                "Groceries",
                "Books",
                "Furniture",
                "Toys",
                "Accessories",
                "Other",
            ),
            allowNull: false,
        },
        itemName: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "sales",
        timestamps: true,
        indexes: [
            { fields: ["categoryId"] },
            { fields: ["currency"] },
            { fields: ["userId"] },
        ],
    },
);

export { Sale };
