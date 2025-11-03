import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { withError } from "@/utils/middleware";
import { handleBatchRequest } from "@/app/api/user/categorize/senders/batch/handle-batch";
import { env } from "@/env";

export const maxDuration = 300;

export const POST = env.QSTASH_CURRENT_SIGNING_KEY
  ? withError(verifySignatureAppRouter(handleBatchRequest))
  : withError(handleBatchRequest);
