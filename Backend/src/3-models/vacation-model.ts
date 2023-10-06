import Joi from "joi";
import { ValidationError } from "./client-errors";
import { UploadedFile } from "express-fileupload";

class VacationModel {
    public vacationId: number;
    public vacationDestination: string;
    public vacationDescription: string;
    public vacationStartDate: Date;
    public vacationEndDate: Date;
    public vacationPrice: number;
    public imageUrl: string;
    public image: UploadedFile;

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.vacationDestination = vacation.vacationDestination;
        this.vacationDescription = vacation.vacationDescription;
        this.vacationStartDate = vacation.vacationStartDate;
        this.vacationEndDate = vacation.vacationEndDate;
        this.vacationPrice = vacation.vacationPrice;
        this.imageUrl = vacation.imageUrl;
        this.image = vacation.image;
    }

    // Validation schema - build once
    private static validationSchema = Joi.object({
        vacationId: Joi.number().optional().integer().positive(),
        vacationDestination: Joi.string().required().min(2).max(50),
        vacationDescription: Joi.string().required().min(2).max(250),
        vacationStartDate: Joi.date().required(),
        vacationEndDate: Joi.date().required(),
        vacationPrice: Joi.number().required().min(0).max(9999.99),
        imageUrl: Joi.string().optional().min(40).max(200),
        image: Joi.object().optional()

    });

    // Validate properties and throw if not valid:
    public validate(): void {
        const result = VacationModel.validationSchema.validate(this);
        if (result.error?.message) throw new ValidationError(result.error.message);
    }
}

export default VacationModel;
