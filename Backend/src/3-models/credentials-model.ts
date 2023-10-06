import Joi from "joi";
import { ValidationError } from "./error-models";

class CredentialsModel{

    public email: string;
    public password: string;

    public constructor(user: CredentialsModel){    //Copy-constructor

        this.email = user.email;
        this.password = user.password;
    }

    // Validation schema:
    private static validationSchema = Joi.object({
        email: Joi.string().required().min(4).max(60),
        password: Joi.string().required().min(4).max(200),
    });

    // Validate properties and throw if not valid
    public validate(): void{
        const result = CredentialsModel.validationSchema.validate(this);
        if(result.error?.message) throw new ValidationError(result.error.message);
    }
}

export default CredentialsModel;