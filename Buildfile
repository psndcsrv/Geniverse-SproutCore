# ===========================================================================
# Project:   Geniverse
# Copyright: ©2010 The Concord Consortium
# ===========================================================================

# Add initial buildfile information here
config :all, :required => [:sproutcore, :cc]
proxy '/geniverse/', :to => 'geniverse.dev.concord.org'