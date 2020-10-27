import { createServer } from "http";
import { render, renderFile } from "pug";
import { join } from "path";
import { red, green } from "chalk";

interface ServerProps {
  port: number;
  dir: string;
}

export class Verser {
  constructor() {}
  listen({ port, dir }: ServerProps) {
    createServer(async (req, res) => {
      const pagesPath = dir;

      const url = req.url?.slice(1);

      const check = url?.length! > 1;

      res.setHeader("X-Powered-By", "Verser");

      switch (check) {
        case true:
          try {
            return res.end(renderFile(join(pagesPath, `${url}.pug`)));
          } catch (e) {
            try {
              return res.end(renderFile(join(pagesPath, "404.pug")));
            } catch (error) {
              console.error(
                red("[404] You must create a 404.pug inside the routes folder")
              );
              return res.end("<h2>Page not found | 4040</h2>");
            }
          }
        default:
          try {
            return res.end(render(renderFile(join(pagesPath, `index.pug`))));
          } catch (e) {
            console.error(
              red("[404] You must create a index.pug inside the routes folder")
            );
            return res.end("<h1>Welcome to Verser</h1>");
          }
      }
    }).listen(port, () => {
      console.log(green("> Server is up and running on", port));
    });
  }
}
