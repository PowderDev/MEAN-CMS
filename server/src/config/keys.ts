import keysDev from "./keys.dev";
import keysProd from "./keys.prod";

// if (process.env.NODE_ENV === 'production') {
//     export default keysProd
// } else {
//     export default  keysDev
// }

export default process.env.NODE_ENV === 'production' ? keysProd : keysDev