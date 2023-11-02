import argparse, subprocess, sys, tqdm
from collections import defaultdict

def line_count(filename):
    return int(subprocess.check_output(['wc', '-l', filename]).split()[0])

def parse(filename, lc, pairs, nps):
    print("reading from " + filename)
    prev_idx = 0
    adjs = {}
    nouns = {}
    heads = defaultdict(list)
    
    bad_feats = set(['Degree=Cmp', 'Degree=Sup', 'NumType=Ord'])
    
    f = open(filename, 'r')
    for line in tqdm.tqdm(f, total=lc):
        cols = line.split('\t')

        if len(cols) > 1 and '-' not in cols[0] and '.' not in cols[0]:
            idx = int(cols[0])

            if idx < prev_idx:
                for hkey in heads:
                    adjlist = []
                    for dkey in heads[hkey]:
                        try:
                            pairs[nouns[hkey]][adjs[dkey]] += 1
                            adjlist.append(adjs[dkey])                            
                        except:
                            pass

                    if len(adjlist) > 1:
                        adjlist = '_'.join(sorted(adjlist))
                    elif len(adjlist) > 0:
                        adjlist = adjlist[0]

                    if len(adjlist) > 0:
                        nps[nouns[hkey]][adjlist] += 1

                adjs = {}
                nouns = {}
                heads = defaultdict(list)

            try:
                if cols[3] == 'NOUN':
                    nouns[idx] = cols[2].lower()                

                add_adj = True
                if cols[3] == 'ADJ' and 'amod' in cols[7]:
                    for feat in bad_feats:
                        if feat in cols[5]:
                            add_adj = False
                            break
                    if add_adj:
                        adjs[idx] = cols[2].lower()
                        heads[int(cols[6])].append(idx)
            except Exception as e:
                print(e)
                print(cols)
                exit()

            prev_idx = idx

    nps = dict(nps)
    pairs = dict(pairs)

    f.close()

    return pairs, nps

def write(d, filename):
    print("writing to " + filename)
    outfile = open(filename, 'w')
    outfile.write(','.join(['count', 'noun', 'adjs']) + '\n')
    for hkey in tqdm.tqdm(d):
        for dkey in d[hkey]:
            outfile.write(','.join([str(d[hkey][dkey]), hkey, dkey]) + '\n')
    outfile.close()

def read_file(d, filename):
    print("reading from " + filename)
    try:
        lc = line_count(filename) - 1
    except:
        return d
    
    f = open(filename, 'r')
    next(f)        
    for line in tqdm.tqdm(f, total=lc):
        cols = line.split(',')
        d[cols[1]][cols[2].replace('\n', '')] = int(cols[0])
    f.close()

    return d

def main():
    parser = argparse.ArgumentParser(description='extract data from conllu')
    parser.add_argument('-i', '--infile', dest='infile', nargs=1, required=True, help='conllu file')
    parser.add_argument('-p', '--pairfile', dest='pairfile', nargs=1, required=True, help='output pairs file')
    parser.add_argument('-n', '--npfile', dest='npfile', nargs=1, required=True, help='output NP file')    
    parser.add_argument('-a', '--append', dest='append', default=False, action='store_true', help='append to existing files')    
    args = parser.parse_args()

    f = args.infile[0]
    lc = line_count(f)

    pairs = defaultdict(lambda: defaultdict(int))
    nps = defaultdict(lambda: defaultdict(int))

    pairfile = args.pairfile[0]
    npfile = args.npfile[0]

    if args.append:
        pairs = read_file(pairs, pairfile)
        nps = read_file(nps, npfile)
    
    pairs, nps = parse(f, lc, pairs, nps)

    write(pairs, pairfile)
    write(nps, npfile)

if __name__ == '__main__':
    main()
