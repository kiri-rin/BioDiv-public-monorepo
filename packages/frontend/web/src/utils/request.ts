const isFile = (input: any) => "File" in window && input instanceof File;
const isDate = (input: any) => "Date" in window && input instanceof Date;
export const serializeRequestToForm = (
  request: object | any[] | string | File,
  form: FormData,
  prevKey = ""
) => {
  switch (typeof request) {
    case "object": {
      if (isDate(request)) {
        form.append(prevKey, (request as Date).toISOString() as string);
        break;
      }
      if (isFile(request)) {
        form.append(prevKey, request as File);
        break;
      }
      if (request === null) {
        form.append(prevKey, request);
        break;
      }
      for (const [key, value] of Object.entries(request)) {
        serializeRequestToForm(
          value,
          form,
          `${prevKey}${prevKey ? "." : ""}${key}`
        );
      }

      break;
    }
    default: {
      request !== undefined && form.append(prevKey, request);
    }
  }
};
