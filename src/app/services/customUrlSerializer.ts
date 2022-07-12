import {DefaultUrlSerializer, UrlSerializer, UrlTree} from "@angular/router";

export class CustomUrlSerializer implements UrlSerializer {
  parse(url: string): UrlTree {
    let dus = new DefaultUrlSerializer();
    return dus.parse(url);
  }

  serialize(tree: UrlTree): string {
    let dus = new DefaultUrlSerializer(),
      path = dus.serialize(tree);
    return path.replace(/%3F/, '?').replace(/%3D/, '=');
  }
}
