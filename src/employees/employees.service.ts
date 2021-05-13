import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { Employee } from "./employee.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { EmployeeCreateDto } from "./employee-create.dto";
import { EmployeeUpdateDto } from "./employee-update.dto";
import { EmployeeFilterDto } from "./employee-filter.dto";

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  private logger = new Logger();

  public async getEmployees(
    filterDto: EmployeeFilterDto,
  ): Promise<Employee[]> {

    const { search, sort, sortCriteria } = filterDto;
    const query = this.employeeRepository.createQueryBuilder('employee');

    if (search) {
      query.andWhere(
        'employee.empName LIKE :search OR employee.empDept LIKE :search',
        { search: `%${search}%` },
      );
    }

    if (sort && !sortCriteria) {
      if (sort.toUpperCase() === 'ASC') {
        query.orderBy('employee.empId', 'ASC');
      } else if (sort.toUpperCase() === 'DESC') {
        query.orderBy('employee.empId', 'DESC');
      }
    } else if (sort && sortCriteria) {
      if (sort.toUpperCase() === 'ASC') {
        query.orderBy('employee.' + sortCriteria, 'ASC');
      } else if (sort.toUpperCase() === 'DESC') {
        query.orderBy('employee.' + sortCriteria, 'DESC');
      }
    }

    try {
      const employees = await query.getMany();
      return employees;
    } catch (error) {
      this.logger.error(`Failed to get employees.`);
      this.logger.error(error.stack);
      throw new InternalServerErrorException();
    }

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
