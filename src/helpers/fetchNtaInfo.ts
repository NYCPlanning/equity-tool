export const fetchNtaInfo = async (
  ntacode: string | null,
  onNtaInfo: (ntaInfo: any) => void
): Promise<any> => {
  if (!ntacode) return null;

  const ntaInfoSql = `SELECT ntacode, ntaname FROM ${process.env.ntaLayer} WHERE ntacode='${ntacode}'`;

  const {
    rows: [ntaInfo],
  } = await (
    await fetch(`https://planninglabs.carto.com/api/v2/sql?q=${ntaInfoSql}`)
  ).json();

  onNtaInfo({
    ntacode: ntaInfo?.ntacode,
    ntaname: ntaInfo?.ntaname,
  });

  return null;
};
