import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UpperAndFusionPipe implements PipeTransform {
  transform(entry: { data: string[] }, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      return entry.data.map((element) => element.toUpperCase()).join('-');
    }
    // console.log(metadata);
    // console.log(myTbale);
    return entry;
    // return entry.data;
  }
}
