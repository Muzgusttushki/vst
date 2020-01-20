import { ReflectMetadata, createParamDecorator } from '@nestjs/common';

export const toArray = (...args: any[]) => {
    console.log(args)
    return (...args: any[]) => {
        console.log(args,'deep');
        console.log('hello');
    };
};