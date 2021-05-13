import { ApiProperty } from "@nestjs/swagger";

export class EmployeeCreateDto {
  @ApiProperty({
    type: String,
    description: 'Name of the Employee to be created',
  })
  empName: string;

  @ApiProperty({
    type: String,
    description: 'Department of the Employee to be created',
  })
  empDept: string;
}
