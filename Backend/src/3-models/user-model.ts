import Joi from "joi";
import RoleModel from "./role-model";
import { ValidationError } from "./error-models";

class UserModel {

    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: RoleModel;

    public constructor(user: UserModel) {    //Copy-constructor
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;

    }

    // Validation schema:
    private static validationSchema = Joi.object({
        userId: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(2).max(50),
        email: Joi.string().required().min(4).max(60),
        password: Joi.string().required().min(4).max(200),
        roleId: Joi.number().optional().min(1).max(2).integer()

    });

    // Validate properties and throw if not valid
    public validate(): void {
        const result = UserModel.validationSchema.validate(this);
        if (result.error?.message) throw new ValidationError(result.error.message);
    }
}

export default UserModel;