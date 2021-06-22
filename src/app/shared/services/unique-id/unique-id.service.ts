import { Injectable } from "@angular/core";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UniqueIdService {


  private numberOfGeneratedIds = 0;

  public generateUniqueIdWithPrefix(prefix: string): string {
    if (!prefix) {
      throw new Error('prefix não pode ser branco');
    }
    if (prefix.match(/^[0-9]+/)) {
      throw new Error('prefix não pode começar com dígito');
    }
    const uniqueId = this.generateUniqueId();
    this.numberOfGeneratedIds++;
    return `${prefix}-${uniqueId}`;
  }

  private generateUniqueId(): string {
    return uuidv4();
  }

  public getNumberOfGeneratedIds(): number {
    return this.numberOfGeneratedIds;
  }

}
