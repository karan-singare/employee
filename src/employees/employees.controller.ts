import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { EmployeesService } from './employees.service';
import { Employee } from './employee.entity';
import { EmployeeCreateDto } from './employee-create.dto';
import { DeleteResult, UpdateResult } from "typeorm";
import { EmployeeUpdateDto } from "./employee-update.dto";

@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Get()
  public async getEmployees(): Promise<Employee[]> {
    return this.employeesService.getEmployees();
  }

  @Get(':id')
  public async getEmployeeById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Employee> {
    return this.employeesService.getEmployeeById(id);
  }

  @Post()
  public async createEmployee(
    @Body() createEmployeeDto: EmployeeCreateDto,
  ): Promise<Employee> {
    return this.employeesService.createEmployee(createEmployeeDto);
  }

  @Put(':id')
  public async updateEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body() employeeUpdateDto: EmployeeUpdateDto,
  ): Promise<UpdateResult> {
    return this.employeesService.updateEmployee(id, employeeUpdateDto);
  }

  @Delete(':id')
  public async deleteEmployee(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return this.employeesService.deleteEmployee(id);
  }
}
