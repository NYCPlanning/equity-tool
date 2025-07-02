export type NtaInfo = {
  nta2020: string;
  ntaname: string;
};

export const fetchNtaInfo = async (
  nta2020: string | null,
  onNtaInfo: (ntaInfo: NtaInfo) => void
): Promise<null> => {
  if (!nta2020) return null;

  const ntaInfoSql = `SELECT nta2020 AS nta2020, ntaname FROM ${process.env.NTA_LAYER} WHERE nta2020='${nta2020}'`;

  try {
    const fetchResponse = await (
      await fetch(`https://planninglabs.carto.com/api/v2/sql?q=${ntaInfoSql}`)
    ).json();

    if (!fetchResponse.error) {
      const {
        rows: [ntaInfo],
      } = fetchResponse;

      onNtaInfo({
        nta2020: ntaInfo?.nta2020,
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
