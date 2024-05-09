
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { UserRole } from "./role.enum";

@Entity({name:'userauth'})
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number
    
    @Column()
    username:string
    
    @Column()
    password:string


    @Column()
    role: UserRole;


}
