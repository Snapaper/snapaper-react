const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_BASE_URL || "https://node.snapaper.com"

const api = (path) => `${API_BASE_URL}${path}`

export default {
	apiUrl: {
		cates: {
			alevel: api("/api/cates/ppca/as-and-a-level/"),
			igcse: api("/api/cates/ppca/igcse/"),
		},
		papers: {
			xyz: {
				alevel: api("/api/papers/xyz/A%20Levels/"),
				igcse: api("/api/papers/xyz/IGCSE/"),
			},
			com: {
				alevel: api("/api/papers/com/a-levels/"),
				igcse: api("/api/papers/com/cambridge-IGCSE/"),
			},
			ppco: {
				alevel: api("/api/papers/ppco/A-Level/"),
				igcse: api("/api/papers/ppco/IGCSE/"),
			},
			ppca: {
				alevel: api("/api/papers/ppca/as-and-a-level/"),
				igcse: api("/api/papers/ppca/igcse/"),
			},
		},
		years: {
			alevel: api("/api/years/ppca/as-and-a-level/"),
			igcse: api("/api/years/ppca/igcse/"),
		},
	},
}
