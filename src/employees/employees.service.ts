import { Injectable } from '@nestjs/common';
import { Employee } from "./employee.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { EmployeeCreateDto } from "./employee-create.dto";
import { EmployeeUpdateDto } from "./employee-update.dto";

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  public async getEmployees(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  public async createEmployee(
    employeeCreateDto: EmployeeCreateDto,
  ): Promise<Employee> {
    const { empName, empDept } = employeeCreateDto;
    return this.employeeRepository.save({
      empName,
      empDept,
    });
  }

  public async getEmployeeById(id: number): Promise<Employee> {
    return this.employeeRepository.findOne(id);
  }

  public async updateEmployee(
    id: number,
    employeeUpdateDto: EmployeeUpdateDto,
  ): Promise<UpdateResult> {
    return this.employeeRepository.update(id, employeeUpdateDto);
  }

  public async deleteEmployee(id: number): Promise<DeleteResult> {
    return this.employeeRepository.delete(id);
  }
}
