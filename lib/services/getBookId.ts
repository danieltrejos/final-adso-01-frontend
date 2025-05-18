type Props = {
    params: {
        id: string
    }
}

export const getBookId = async ({ params }: Props) => {
    return params.id
}