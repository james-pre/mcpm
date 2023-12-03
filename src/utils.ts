import path from 'path';

export const mc_dir = path.join(process.env.APPDATA, '.minecraft');

export const mcpm_dir = path.join(mc_dir, '.mcpm');
