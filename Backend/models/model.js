import sequelize from "../config/db.connection.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define(
    "User",
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    },
    {
        tableName: "Users",
    }
);





