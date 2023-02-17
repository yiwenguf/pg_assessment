import * as studentDal from '../dal/student'

export function suspendStudent(name: string): Promise<[number]>{
    return studentDal.suspendStudent(name);
}