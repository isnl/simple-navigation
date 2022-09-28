import superagent from 'superagent';
import cheerio from 'cheerio';
import download from 'download';
import path from 'path';
import { omit } from 'lodash';
import fs from 'fs';
export function success(ctx, data) {
  ctx.body = {
    code: 200,
    data,
  };
}
export function error(ctx, err) {
  ctx.body = {
    msg: err.msg,
    code: 500,
  };
}
async function imgDownload(ext, url) {
  try {
    const now = Date.now();
    await download(url, path.join(__dirname, `../public/upload/`), {
      filename: `${now}.${ext}`,
    });
    return `/upload/${now}.${ext}`;
  } catch (error) {}
}

export async function getUrlInfo(url) {
  const data = await new Promise((resolve, reject) => {
    superagent.get(url).end(async (err, res) => {
      if (err) {
        reject(false);
      }
      if (res && res.request) {
        const { protocol, host } = res.request;
        const realUrl = protocol + '//' + host;
        try {
          const $ = cheerio.load(res.text);
          let link = $('link[type="image/x-icon"]');
          if (!link.length) {
            link = $('link[rel*="icon"]');
            if (link.length > 1) {
              link.each((index, item) => {
                const rel = $(item).attr('rel');
                const splitRel = rel.split(' ');
                const hasIcon = splitRel.some((r) => r === 'icon');
                if (hasIcon) {
                  link = $(item);
                }
              });
            }
          }
          const linkUrl = link.attr('href');
          let icon = '';
          const arrayList = [
            'http',
            '//',
            'www',
            '.com',
            '.cn',
            '.com.cn',
            '.io',
            '.net',
            '.vip',
            '.org',
            '.top',
            '.design',
          ];
          if (linkUrl) {
            const isFullUrl = arrayList.some((item) => linkUrl.includes(item));
            if (isFullUrl) {
              icon = linkUrl.includes(protocol)
                ? linkUrl
                : `${protocol}${linkUrl}`;
            } else {
              icon = `${realUrl}${linkUrl}`;
            }
            const [ext] = icon.split('.').reverse();
            icon = await imgDownload(ext, icon);
          }
          resolve({
            url: url.includes('http') ? url : `https://${url}`,
            icon,
            name: $('title').text(),
          });
        } catch (error) {
          reject(false);
        }
      } else {
        reject(false);
      }
    });
  });
  return data;
}
