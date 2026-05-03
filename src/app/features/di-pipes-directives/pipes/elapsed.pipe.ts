import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'elapsed', pure: false })
export class ElapsedPipe implements PipeTransform {
  transform(start: number, tick: number): string {
    void tick;
    const ms = Math.max(0, Date.now() - start);
    const s = Math.floor(ms / 1000);
    return `${s}s ago`;
  }
}
