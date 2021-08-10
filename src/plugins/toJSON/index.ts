// libs
import { Document, Model, Schema } from "mongoose";

type Transform<DocType> = (_model: Model<DocType>, _ret: Document<any, Record<string, never>, DocType>) => void | undefined;

/**
 * A mongoose schema plugin which applies the following in the toJSON transform call:
 *  - removes __v, createdAt, updatedAt, and any path that has private: true
 *  - replaces _id with id
 */
export default function toJSON<DocType = Document, SchemaDefinitionType = undefined>(
  schema: Schema<DocType, Model<DocType>, SchemaDefinitionType>
) {
  const anySchema = schema as any;
  const transform: Transform<DocType> =
    typeof anySchema.options?.toJSON?.transform === "function" ? anySchema.options.toJSON.transform : undefined;

  anySchema.options.toJSON = Object.assign(anySchema.options?.toJSON || {}, {
    transform(model: Model<DocType>, ret: Document<any, Record<string, never>, DocType>): void {
      Object.keys(schema.paths).forEach((path) => {
        if (anySchema.paths[path]?.options?.private) {
          deleteAtPath(ret, path.split("."), 0);
        }
      });

      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      delete (ret as any).createdAt;
      delete (ret as any).updatedAt;
      if (transform) {
        return transform(model, ret);
      }
    },
  });
}

/**
 * deleteAtPath
 */
function deleteAtPath(obj: Record<string, any> | undefined, path: string[], index: number) {
  if (obj === undefined || index < 0 || index >= path.length) {
    return;
  }
  const selectedPath = path[index];
  if (index === path.length - 1) {
    delete obj[selectedPath];
  } else {
    const subObj = obj[selectedPath];
    if (typeof subObj === "object" && subObj !== null) {
      deleteAtPath(subObj, path, index + 1);
    }
  }
}
