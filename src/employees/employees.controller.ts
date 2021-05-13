import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { EmployeesService } from './employees.service';
import { Employee } from './employee.entity';
import { EmployeeCreateDto } from './employee-create.dto';
import { DeleteResult, UpdateResult } from "typeorm";
import { EmployeeUpdateDto } from "./employee-update.dto";
import { EmployeeFilterDto } from "./employee-filter.dto";
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";

@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get All the employees',
  })
  @ApiBody({
    type: EmployeeFilterDto,
  })
  public async getEmployees(
    @Query() searchFilter: EmployeeFilterDto,
  ): Promise<Employee[]> {
    return this.employeesService.getEmployees(searchFilter);
  }

  @ApiOkResponse({
    description: 'Get Employee By ID',
  })
  @Get(':id')
  public async getEmployeeById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Employee> {
    return this.employeesService.getEmployeeById(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Employee Creation',
  })
  @ApiBody({
    type: EmployeeCreateDto,
  })
  public async createEmployee(
    @Body() createEmployeeDto: EmployeeCreateDto,
  ): Promise<Employee> {
    return this.employeesService.createEmployee(createEmployeeDto);
  }

  @Put(':id')
  @ApiBody({
    type: EmployeeUpdateDto,
  })
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
