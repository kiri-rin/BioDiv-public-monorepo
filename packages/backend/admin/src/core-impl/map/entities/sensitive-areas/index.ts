import {
  CommonArea,
  CommonEntityWithArea,
} from "@rrrcn/admin/src/core/common/entities/area";
import { CommonWithId } from "@rrrcn/admin/src/core/common/entities/withId";

export abstract class IMapSensitiveArea<IdType>
  implements CommonEntityWithArea, CommonWithId<IdType>
{
  private _id: IdType;
  private _area: CommonArea;
  public title: string;

  get area() {
    return this._area;
  }
  get id() {
    return this._id;
  }
}
