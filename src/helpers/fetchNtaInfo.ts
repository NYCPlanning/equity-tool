export const fetchNtaInfo = async (
  ntacode: string | null,
  onNtaInfo: (ntaInfo: any) => void
): Promise<null> => {
  if (!ntacode) return null;

  const ntaInfoSql = `SELECT ntacode, ntaname FROM ${process.env.NTA_LAYER} WHERE ntacode='${ntacode}'`;

  try {
    const fetchResponse = await (
      await fetch(`https://planninglabs.carto.com/api/v2/sql?q=${ntaInfoSql}`)
    ).json();

    if (!fetchResponse.error) {
      const {
        rows: [ntaInfo],
      } = fetchResponse;

      onNtaInfo({
        ntacode: ntaInfo?.ntacode,
        ntaname: ntaInfo?.ntaname,
      });
    } else {
      console.log(`Error: ${fetchResponse.error}`);
    }
  } catch (e: unknown) {
    if (typeof e === "object") {
      const error = e as { error: string };

      console.log(`Error: ${error}`);
    }
  }

  return null;
};
