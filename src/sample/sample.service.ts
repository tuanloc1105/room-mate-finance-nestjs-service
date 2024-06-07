import { Injectable } from '@nestjs/common';
import { Sample } from './sample.object.type';

@Injectable()
export class SampleService {
  private samples: Sample[] = [
    { id: 1, name: 'Sample 1' },
    { id: 2, name: 'Sample 2' },
  ];

  findAll(): Sample[] {
    return this.samples;
  }
}
