import { Category } from "./category.model";
import { Sale } from "./sales.model";
import { User } from "./user.model";

User.hasMany(Sale, { foreignKey: "userId", as: "sales" });

Sale.belongsTo(User, { foreignKey: "userId", as: "user" });

Category.hasMany(Sale, { foreignKey: "categoryId", as: "sales" });

Sale.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
