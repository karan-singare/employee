import { ApiProperty } from "@nestjs/swagger";

export class EmployeeUpdateDto {
  @ApiProperty({
    type: String,
    description:
      'Name of the employee to be updated',
  })
  empName: string;

  @ApiProperty({
    type: String,
    description:
      'Department of the employee to be updated',
  })
  empDept: string;
}
