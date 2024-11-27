function str_RegEx(x) {
  return x.replace(/[\^$()\[{.*+?|]/g, '\\$&')
}

var asm51 = (()=>{
	"use strict";
	const pseudo_insts = [
		'org', 'origin', 'end',
		// predesine section name
		'data', 'code', 'rsect', 'bsect',
		// predefine data
		'db', 'dw', 'defb', 'defw',
		'byte', 'word', 'long', 'float', 'double',
		'string', 'ascii', 'longw', 'lword',
		'fcb', 'fdb', 'fcc',
		// reserve storage
		'ds', 'rmb', 'defs', 'blkb', 'blkw', 'blkl',
		// compile time variable
		'equ', 'equal', 'var', 'defl', 'reg', 'register',
		'macro', 'argchk', 'endm', 'macend', 'macdelim',
		'xdef', 'global', 'public', 'xref', 'extern', 'external', 'ask',
		'section', 'ends', 'absolute', 'relative', 'module', 'endmod',
		'include',
		// conditional
		'ifz', 'ife', 'if', 'ifn', 'ifnz', 'cond', 'ifntrue', 'iffalse',
		'ifdef', 'ifndef', 'ifsame', 'ifndiff', 'ifnsame', 'ifdiff', 'ifext', 'ifnext',
		'ifabs', 'ifnrel', 'ifrel', 'ifnabs', 'ifma', 'ifnma', 'else', 'endc', 'endif',
		'ifclear', 'exit',
		// compiler setting (options)
		'llchar', 'radix', 'chip', 'globals', 'spaces', 'twochar', 'bit7', 'comment',
		// List control
		'list', 'nolist', 'nlist', 'maclist', 'mlist', 'mnlist', 'condlist', 'asclist',
		'pw', 'pl', 'top', 'pass1', 'pag', 'page', 'eject', 'nam', 'ttl', 'title', 'heading',
		'sttl', 'subtitle', 'subttl',
		// linker control
		'fillchar', 'recsize', 'symbols', 'options', 'linklist', 'comrec',
	]
	const mnemonics = [
		'add', 'addc', 'subb', 'dec', 'inc', 'mul', 'div', 'da',
		'anl', 'orl', 'xrl', 'clr', 'cpl', 'rl', 'rlc', 'rr', 'rrc',
		'swap', 'mov', 'movc', 'movx', 'push', 'pop', 'xch', 'xchd',
		'setb', 'jc', 'jnc', 'jb', 'jnb', 'jbc', 'jz', 'jnz',
		'ajmp', 'sjmp', 'ljmp', 'jmp', 'cjne', 'djnz',
		'acall', 'lcall', 'call', 'ret', 'reti', 'nop',
	]
	const registers0 = [
		'a', 'acc', 'b', 'ie', 'ip', 'p0', 'p1', 'p2', 'p3',
		'psw', 'scon', 'tcon',
		// DS80C390
		'p4', 'scon0', 'scon1', 't2con', 'wdcon', 'eie', 'eip',
	]
	const registers = [
		'r0', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7',
		/* Special function registers */
		'a', 'acc', 'b', 'dpl', 'dph', 'p0', 'p1', 'p2', 'p3',
		'ip', 'ipc', 'ie', 'iec', 'pcon', 'scon', 'sbuf',
		'tcon', 'tmod', 'tl0', 'tl1', 'th0', 'th1', 'psw', 'sp',
		'dptr', 'ab',
		// 8052
		't2con', 'rcap2l', 'rcap2h', 'tl2', 'th2',
		// 8044
		'sts', 'smd', 'rcb', 'rbl', 'rbs', 'rfl', 'stad',
		'dmacnt', 'dma', 'nsnr', 'siust', 'tcb', 'tbl', 'tbs',
		// DS80C390
		'p4', 'p4cnt', 'p5', 'p5cnt',
		// - Extend Address
		'dpl1', 'dph1', 'dpx', 'dpx1', 'dps', 'esp', 'ap', 'acon',
		'mxax', 'mcon', 'ta',
		// - clock, WDT
		'ckcon', 't2mod', 'cor', 'pmr', 'status', 'wdcon',
		// - Extend interrupt
		'exif', 'eie', 'eip',
		// - Multiplier
		'mcnt0', 'mcnt1', 'ma', 'mb', 'mc',
		// - Serial Port
		'scon0', 'sbuf0', 'saddr0', 'saden0', 'scon1', 'sbuf1', 'saddr1', 'saden1',
		// - CAN bus port 1
		'c0rms0', 'c0rms1', 'c0tma0', 'c0tma1', 'c0c', 'c0s', 'c0ir', 'c0te', 'c0re',
		'c0m1c', 'c0m2c', 'c0m3c', 'c0m4c', 'c0m5c', 'c0m6c', 'c0m7c', 'c0m8c',
		'c0m9c', 'c0m10c', 'c0m11c', 'c0m12c', 'c0m13c', 'c0m14c', 'c0m15c',
		// - CAN bus port 1
		'c1rms0', 'c1rms1', 'c1tma0', 'c1tma1', 'c1c', 'c1s', 'c1ir', 'c1te', 'c1re',
		'c1m1c', 'c1m2c', 'c1m3c', 'c1m4c', 'c1m5c', 'c1m6c', 'c1m7c', 'c1m8c',
		'c1m9c', 'c1m10c', 'c1m11c', 'c1m12c', 'c1m13c', 'c1m14c', 'c1m15c',
	]
	const bits = [
		'it0', 'ie0', 'it1', 'ie1', 'tr0', 'tf0', 'tr1', 'tf1',
		't2', 't2ex',
		'ri', 'ti', 'rb8', 'tb8', 'ren', 'sm2', 'sm1', 'sm0',
		'ex0', 'et0', 'ex1', 'et1', 'es', 'et2', 'ea',
		'rxd', 'txd', 'int0', 'int1', 't0', 't1', 'wr', 'rd',
		'px0', 'pt0', 'px1', 'pt1', 'ps', 'pt2',
		'p', 'ov', 'rs0', 'rs1', 'f0', 'ac', 'cy', 'c',
		// 8052
		'cprl2', 'ct2', 'tr2', 'exen2', 'tclk', 'rclk', 'exf2', 'tf2',
		// 8044
		'rbp', 'am', 'opb', 'bov', 'bv', 'si', 'rts', 'rbe', 're', 'tbf',
		'ser', 'nr0', 'nr1', 'nr2', 'ses', 'ns0', 'ns1', 'ns2',
		// DS80C390
		'rxd1', 'txd1', 'int2', 'int3', 'int4', 'int5',
		'ri_0', 'ti_0', 'rb8_0', 'tb8_0', 'ren_0', 'sm2_0', 'sm1_0', 'sm0_0', 'fe_0',
		'rxd0', 'txd0', 'es0', 'es1', 'ps0', 'ps1',
		'ri_1', 'ti_1', 'rb8_1', 'tb8_1', 'ren_1', 'sm2_1', 'sm1_1', 'sm0_1', 'fe_1',
		'f1',
		'rwt', 'ewt', 'wtrf', 'wdif', 'pfi', 'epfi', 'por', 'smod_1',
		'ex2', 'ex3', 'ex4', 'ex5', 'ewdi', 'c1ie', 'c0ie', 'canbie',
		'px2', 'px3', 'px4', 'px5', 'pwdi', 'c1ip', 'c0ip', 'canbip',
	]
	var ops1_re = /[><+\-\\]/
	var ops2_re = /[*/+\-&\^]/
	var ops3_re = [ "**", ".MOD.", ".SHR.", ".SHL.", ".AND.", ".OR.", ".XOR." ].map( x => str_RegEx(x) )
	var ops4_re = [ ".EQ.", ".GT.", ".LT.", ".UGT.", ".ULT." ].map( x => str_RegEx(x) )

	const number_re = "\\b([01]+b|[0-7]+o|[0-9]+d?|[0-9a-f]+h)\\b"
	const comma_re = "[ \\t]*,?[ \\t]*"
	const space_re = "[ \\t]*"
	const unary_re = "[><+\\-\\\\]"

	const expression = [ {
		begin: [ "\\(?", "[\\w_.+\\-*/ \\t]+", "\\)?" ],
		beginScope: { 1:"operator", 2:"expression", 3:"operator" },
		contains: ['self']
	} ]

/*	}, {
		begin: [ comma_re, "#[()<>+\\-/\\\\]?", "\\w+" ],
		beginScope: { 2: "operator", 3: "expression" },
	}, {
		begin: [ comma_re, "#", number_re ],
		beginScope: { 2: "operator", 3: "number" }
	}, {
		begin: [ comma_re, "#", "\\b\\w+\\b"],
		beginScope: { 2: "operator", 3: "number" }   // label
*/
/*    }, {
		begin: [ comma_re, '(\\$\\w*|\\w+\\$)' ],
		beginScope: { 2: "local_label_ref" },
	}, {
		begin: [ comma_re, "[()<>+\\-\\\\/]?", "\\w+" ],
		beginScope: { 2: "operator", 3: "expression" },
	}, {
		begin: [ comma_re, '\\b\\w+\\b' ],
		beginScope: { 2: "label_ref" },
*/
	const label_defs = [ {
		begin: [ "^\\$\\w+|^\\w+\\$", ":?" ],
		beginScope: { 1: "local_label" },
	}, {
		begin: [ "^[ \\t]+", "\\$\\w+|\\w+\\$", ":" ],
		beginScope: { 2: "local_label" },
	}, {
		begin: [ "^[A-Za-z_]\\w*", ":?" ],
		beginScope: { 1: "label" },
	}, {
		begin: [ "^[ \\t]+", "[A-Za-z_]\\w*", ":" ],
		beginScope: { 2: "label" },
	} ]

	const operands = [ {
		begin: [ comma_re, `\\b(${bits.join('|')})\\b` ],
		beginScope: { 2: "bit" },
	}, {
		begin: [ comma_re, `\\b(${registers0.join('|')})\\b\\.[0-7]` ],
		beginScope: { 2: "bit" },
	}, {
		begin: [ comma_re, `\\b(${registers.join('|')})\\b` ],
		beginScope: { 2: "register" },
	}, {
		begin: [ comma_re, "@", "dptr|r0|r1|a\\+pc|a\\+dptr" ],
		beginScope: { 2: "operator", 3: "register" },
	}, {
		begin: [ comma_re, "#" ],
		beginScope: { 2: "operator" },
		contains: expression,
	}, {
		begin: [ comma_re, '(\\$\\w*|\\w+\\$)' ],
		beginScope: { 2: "local_label_ref" },
	}, {
		begin: [ comma_re, '\\b\\w+\\b' ],
		beginScope: { 2: "label_ref" },
	} ]

	const psuedo_operands = [ {
		begin: [ "\\b(on|off)\\b" ],
		beginScope: { 1: "meta" },
	}, {
		begin: [ `\\b(${registers0.join('|')})\\b`, '\\.', '[0-7]' ],
		beginScope: { 1: "register", 2: "operator", 3: "number" },
	}, {
		begin: [ `\\b(${registers.join('|')})\\b` ],
		beginScope: { 1: "register" },
	}, {
		begin: [ `\\b(${bits.join('|')})\\b` ],
		beginScope: { 1: "bit" },
	}, {
		begin: [ number_re, comma_re ],
		beginScope: { 1: "number" },
	} ]

	const inst_line = {
		begin: [ `\\b(${mnemonics.join('|')})\\b`, space_re ],
		beginScope: { 1: "instruction" },
		contains: operands,
	}
	const dire_line = {
		variants: [ {
			begin: [ `\\.?(${pseudo_insts.join('|')})\\b`, space_re ],
			beginScope: { 1: "directive" },
		}, {
			begin: [ `\\.\\w+\\b`, space_re ],
			beginScope: { 1: "label" },
		} ],
		contains: psuedo_operands,
	}

	return r=>({
		name:"8051 Assembly",
		alias:"a51",
		case_insensitive:true,
/*      classNameAliases: {
			label: "symbol",
			label_ref: "symbol",
			local_label: "symbol local",
			local_label_ref: "symbol local",
			instruction: "keyword",
			directive: "keyword local",
			register: "built_in",
			bit: "built_in local",
			expression: "variable"
		},
*/      contains:[
		r.COMMENT(";|^[;*]","$",{relevance:1}),
//		r.QUOTE_STRING_MODE,
		label_defs,
		inst_line,
		dire_line,
//		expression,
		{
			scope:"string",
			begin:"'",
			end:"[^\\\\]'",
			illegal:"[^\\\\][^']"
/*      },{
			scope:"subst",
			begin:"@[0-9]+"
*/		} ]
	})
})();
