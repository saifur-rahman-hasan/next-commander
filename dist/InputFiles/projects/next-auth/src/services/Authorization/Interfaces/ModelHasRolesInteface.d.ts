import { ModelType } from "@prisma/client";

interface ModelHasRolesCreateInterface {
  role_ids?: string[];
  model_type?: ModelType;
  model_id?: string;
}

interface ModelHasRolesDeleteInterface {
  id?: string;
  model_type?: ModelType;
}

interface ModelHasRolesReadInterface extends ModelHasRolesCreateInterface {
  id?: string;
}
