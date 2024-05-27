import {createClient} from '@sanity/client'

export const client = createClient({
    projectId: "3z3z6aif",
    dataset: "production",
    useCdn: true,
    apiVersion: "2022-03-07"
  })


/*skmlRXn4RskZfBL77SuO2AMf0t9cpj6JpgCcw0mWwmRoIAiX8OreBasbltyHiCo62oKMnZ7Ma6MbQyqQRXmYaoU4TWqN2CsWHszuYIShbSrt4TjanobPbd9i19vdcRB6sIMxNZ0NnuiFvgxTsOMH6qOJDudB0GeUTcz2NclMGbhP1ZLZdr5U*/

export const writeClient = createClient({
    projectId: "3z3z6aif",
    dataset: "production",
    useCdn: false,
    apiVersion: "2022-03-07",
    token: "skmlRXn4RskZfBL77SuO2AMf0t9cpj6JpgCcw0mWwmRoIAiX8OreBasbltyHiCo62oKMnZ7Ma6MbQyqQRXmYaoU4TWqN2CsWHszuYIShbSrt4TjanobPbd9i19vdcRB6sIMxNZ0NnuiFvgxTsOMH6qOJDudB0GeUTcz2NclMGbhP1ZLZdr5U"
  })