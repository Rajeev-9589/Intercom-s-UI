import { motion } from 'framer-motion';

export default function ChatWindow() {
  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <header className="p-4 border-b font-semibold text-lg bg-white">Luis Easton</header>

      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {/* Customer message */}
        <motion.div
          className="max-w-xl p-4 bg-white rounded-lg shadow border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          I bought a product from your store in November as a Christmas gift for a member of my
          family. However, it turns out they have something very similar already. I was hoping
          you’d be able to refund me, as it is un-opened.
        </motion.div>

        {/* Agent reply */}
        <motion.div
          className="max-w-xl ml-auto p-4 bg-blue-100 rounded-lg border border-blue-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Let me just look into this for you, Luis.
          <div className="text-xs text-gray-500 text-right mt-1">Seen · 1min</div>
        </motion.div>
      </div>
    </div>
  );
}
