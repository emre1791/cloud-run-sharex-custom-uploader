import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import assert from 'assert';

const client = new SecretManagerServiceClient();

export async function getSecretValue(secretName: string) {
  const projectId = process.env["GCP_PROJECT_ID"];
  assert(projectId, "GCP_PROJECT_ID is not set");

  const path = `projects/${projectId}/secrets/${secretName}/versions/latest`;
  const [version] = await client.accessSecretVersion({ name: path });

  assert(version, "No version returned from secret manager");
  assert(version.payload, "No payload returned from secret manager");
  assert(version.payload.data, "No data returned from secret manager");

  return version.payload.data.toString();
}
