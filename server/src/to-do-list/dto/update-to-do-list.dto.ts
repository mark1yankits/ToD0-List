import { PartialType } from '@nestjs/mapped-types';
import { CreateToDoListDto } from './create-to-do-list.dto';

export class UpdateToDoListDto extends PartialType(CreateToDoListDto) {
    readonly isCompleted?: boolean;
    readonly title?: string;
    readonly description?: string;
}
