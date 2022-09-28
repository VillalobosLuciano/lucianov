interface Props {
  mt: number
  mb: number
}

export default function SectionSeparator({ mt, mb }: Props) {
  return <hr className={`mt-${mt} mb-${mb} border-white/5`} />
}
