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
