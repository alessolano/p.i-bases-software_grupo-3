import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import type { Response } from 'express';
import { join } from 'path';
import { existsSync } from 'fs';

@Controller('image')
export class ImageController {
  @Get(':filename')
  getImage(@Param('filename') filename: string, @Res() res: Response) {
    const safeName = filename.replace(/[/\\]/g, '');
    const filePath = join(process.cwd(), 'uploads', safeName);

    if (!existsSync(filePath)) {
      throw new NotFoundException('Image not found');
    }

    return res.sendFile(filePath);
  }
}